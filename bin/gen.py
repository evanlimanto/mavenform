import argparse

def generate_file(filename, num_questions=10, course="", examtype="", term="", prof=""):
  template = \
'''course: '%s'
ref: '%s-%s'

type: '%s'
term: '%s'
prof: '%s'

questions: {

}

parts: {

}

%s
''' % (course, examtype, term, examtype, term, prof, '\n'.join([('q%s_1: |\n\nq%s_1_i:\n\nq%s_1_s:\n\n' % (str(i + 1), str(i + 1), str(i + 1))) for i in range(num_questions)]))
  fp = open(filename, "w")
  fp.write(template)
  fp.close()

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument('outputfile')
  parser.add_argument('-q', default=10)
  parser.add_argument('-course', default='')
  parser.add_argument('-type', default='')
  parser.add_argument('-term', default='')
  parser.add_argument('-prof', default='')
  args = parser.parse_args()

  generate_file(args.outputfile, int(args.q), args.course, args.type, args.term, args.prof)
