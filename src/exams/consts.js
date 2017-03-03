const exams = {
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
    'midterm2': {
      'Fall 2016': {
        'id': 'fa16',
        'profs': 'Boser, Katz',
      }
    }
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
  'ee16a': 'Designing Information Devices and Systems I',
  'cs61c': 'Great Ideas in Computer Architecture (Machine Structures)',
  'cs162': 'Operating Systems and Systems Programming',
  'data8': 'Foundations of Data Science',
};

const examTypeToLabel = {
  'mt1': 'Midterm 1',
  'mt2': 'Midterm 2',
}

const termToLabel = {
  'sp14': 'Spring 2014',
  'fa14': 'Fall 2014',
  'sp15': 'Spring 2015',
  'fa15': 'Fall 2015',
  'sp16': 'Spring 2016',
  'fa16': 'Fall 2016'
};

const courseIDToLabel = {
  'ee16a': 'EE 16A',
  'cs61c': 'CS 61C',
  'cs162': 'CS 162',
  'data8': 'Data 8',
};

export { exams, courses, examTypeToLabel, courseIDToLabel, termToLabel };
