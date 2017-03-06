const exams = {
  'chem1a': {
    'mt2': {
      'Spring 2013': {
        'id': 'sp13',
        'profs': 'Pines',
      },
      'Spring 2011': {
        'id': 'sp11',
        'profs': 'Nitsche',
      }
    }
  },

  'ee16a': {
    'mt1': {
      'Fall 2016': {
        'id': 'fa16',
        'profs': 'Ayazifar, Stojanovic',
      },
      'Spring 2016': {
        'id': 'sp16',
        'profs': 'Alon, Ayazifar',
      },
      'Fall 2015': {
        'id': 'fa15',
        'profs': 'Niknejad, Sahai',
      },
      'Spring 2015': {
        'id': 'sp15',
        'profs': 'Alon, Ayazifar, Subramanian',
      },
    },
  },

  'cs61c': {
    'mt1': {
      'Fall 2016': {
        'id': 'fa16',
        'profs': 'Boser, Katz',
      },
      'Spring 2016': {
        'id': 'sp16',
        'profs': 'Stojanovic, Weaver',
      },
      'Fall 2015': {
        'id': 'fa15',
        'profs': 'Stojanovic, Wawrzynek',
      },
      'Spring 2015': {
        'id': 'sp15',
        'profs': 'Asanovic, Stojanovic',
      },
      'Fall 2014': {
        'id': 'fa14',
        'profs': 'Garcia, Lustig',
      },
      'Spring 2014': {
        'id': 'sp14',
        'profs': 'Garcia',
      },
    },
  },

  'cs162': {
    'mt1': {
      'Fall 2016': {
        'id': 'fa16',
        'profs': 'Joseph',
      },
      'Spring 2016': {
        'id': 'sp16',
        'profs': 'Joseph',
      },
      'Fall 2015': {
        'id': 'fa15',
        'profs': 'Kubiatowicz',
      },
      'Spring 2015': {
        'id': 'sp15',
        'profs': 'Kubiatowicz',
      },
    },
  },

  'data8': {
    'mt1': {
      'Fall 2016': {
        'id': 'fa16',
        'profs': 'Adhikari'
      },
      'Spring 2016': {
        'id': 'sp16',
        'profs': 'DeNero, Adhikari, Jordan, Parikh, Wagner'
      },
      'Fall 2015': {
        'id': 'fa15',
        'profs': 'Adhikari'
      }
    }
  }
};

const courses = {
  'chem1a': 'General Chemistry',
  'data8': 'Foundations of Data Science',
  'ee16a': 'Designing Information Devices and Systems I',
  'cs61c': 'Great Ideas in Computer Architecture (Machine Structures)',
  'cs162': 'Operating Systems and Systems Programming',
};

const examTypeToLabel = {
  'mt1': 'Midterm 1',
  'mt2': 'Midterm 2',
  'final': 'Final',
}

const termToLabel = {
  'sp11': 'Spring 2011',
  'fa11': 'Fall 2011',
  'sp12': 'Spring 2012',
  'fa12': 'Fall 2012',
  'sp13': 'Spring 2013',
  'fa13': 'Fall 2013',
  'sp14': 'Spring 2014',
  'fa14': 'Fall 2014',
  'sp15': 'Spring 2015',
  'fa15': 'Fall 2015',
  'sp16': 'Spring 2016',
  'fa16': 'Fall 2016'
};

const courseIDToLabel = {
  'chem1a': 'Chem 1A',
  'ee16a': 'EE 16A',
  'cs61c': 'CS 61C',
  'cs162': 'CS 162',
  'data8': 'Data 8',
};

export { exams, courses, examTypeToLabel, courseIDToLabel, termToLabel };
