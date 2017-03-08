import string
import argparse
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.converter import TextConverter
from pdfminer.cmapdb import CMapDB
from pdfminer.layout import LAParams
import os

# main
def main(fname, output_f):
  # debug option
  debug = 0
  # input option
  password = ''
  pagenos = set()
  maxpages = 0
  # output option
  imagewriter = None
  rotation = 0
  codec = 'utf-8'
  caching = True
  laparams = LAParams()
  #
  PDFDocument.debug = debug
  PDFParser.debug = debug
  CMapDB.debug = debug
  PDFPageInterpreter.debug = debug
  #
  rsrcmgr = PDFResourceManager(caching=caching)
  outfp = open(output_f, 'w')
  device = TextConverter(rsrcmgr, outfp, codec=codec, laparams=laparams,
                         imagewriter=imagewriter)
  fp = open(fname, 'rb')
  interpreter = PDFPageInterpreter(rsrcmgr, device)
  for (i, page) in enumerate(PDFPage.get_pages(fp, pagenos,
                                maxpages=maxpages, password=password,
                                caching=caching, check_extractable=True)):
    if i < 2:
      continue
    page.rotate = (page.rotate+rotation) % 360
    interpreter.process_page(page)
  fp.close()
  device.close()
  outfp.close()

def is_number(ch):
  o = ord(ch)
  return o >= 48 and o <= 57

def is_letter(ch):
  o = ord(ch)
  return (o >= 65 and o <= 90) and (o >= 97 and o <= 122)

import editdistance
def match_question(s, index, q_num):
  expected = '%s.' % (q_num,)
  real = s[index:index + len(expected) + 1].lower()
  return editdistance.eval(expected, real) <= 1

def match_subquestion(s, index, q_num):
  expected = '%s.' % (chr(q_num + ord('a') - 1),)
  real = s[index:index + len(expected) + 1].lower()
  return editdistance.eval(expected, real) <= 1

questions = []
class Question:
  def __init__(self, contents):
    self.parts = []
    self.contents = contents
    self.qc = ""

  def parse(self):
    i = 0
    cur_q = 1
    start_i = None
    first = True
    while i < len(self.contents):
      start_i = i
      while i < len(self.contents) and not match_subquestion(self.contents, i, cur_q):
        i += 1
      if match_subquestion(self.contents, i, cur_q):
        if first:
          first = False
          self.qc = self.contents[:i]
          start_i = i
        while i + 1 < len(self.contents) and not match_subquestion(self.contents, i + 1, cur_q + 1):
          i += 1
        i += 1
        self.parts.append(self.contents[start_i:i])
        start_i = i
        cur_q += 1
      else:
        i += 1
    if start_i < i:
      self.parts.append(self.contents[start_i:])

def process(fname):
  f = open(fname, 'r')
  contents = f.read()
  print(contents)

  i = 0
  cur_q = 1
  start_i = None
  while i < len(contents):
    if match_question(contents, i, cur_q):
      start_i = i
      while i < len(contents) and not match_question(contents, i, cur_q + 1):
        i += 1
      questions.append(Question(contents[start_i:i]))
      cur_q += 1
    else:
      i += 1
  if i < len(contents):
    questions.append(Question(contents[i:]))
  for (i, question) in enumerate(questions):
    question.parse()

if __name__ == '__main__':
  import re
  parser = argparse.ArgumentParser()
  parser.add_argument("infile")
  parser.add_argument("outfile")
  args = parser.parse_args()

  filename = args.infile
  #main(filename, 'out.txt')
  process('out.txt')
  #os.remove('out.txt')

  etype = 'mt2'
  sem = 'sp11'
  header = \
  '''course: 'ugba10'
ref: '%s-%s'

type: '%s'
term: '%s'
prof: 'Nitsche'
mcq: true
num: 40
  '''
  header = header % (etype, sem, etype, sem)

  items = [header]
  pattern = re.compile("ANS: ([A-Z])")
  for (i, question) in enumerate(questions):
    try:
      ans = pattern.findall(question.parts[-1].strip())[0]
    except IndexError:
      ans = "?"
    fmt = '''
q%s_%s: |
  %s

q%s_%s_i:
%s

q%s_%s_s: %s
    ''' % (i + 1, 1, question.qc.strip(), i + 1, 1, '\n'.join('  - %s' % subquestion.strip().replace('\n', '') for subquestion in question.parts), i + 1, 1, ord(ans) - ord('A') + 1)
    items.append(fmt)

  outfile = args.outfile
  f = open(outfile, 'w')
  yaml = ''.join(items)

  printable = set(string.printable) - set(chr(12))
  yaml = filter(lambda x: x in printable, yaml)
  f.write(yaml)
