const exams = {
  'ee16a': {
    'midterm1': {
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
    'midterm1': {
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
    'midterm1': {
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
};

const courses = {
  'ee16a': 'Designing Information Devices and Systems I',
  'cs61c': 'Great Ideas in Computer Architecture (Machine Structures)',
  'cs162': 'Operating Systems and Systems Programming',
};

const examTypeToLabel = {
  'midterm1': 'Midterm 1',
  'midterm2': 'Midterm 2',
};

const courseIDToLabel = {
  'ee16a': 'EE 16A',
  'cs61c': 'CS 61C',
  'cs162': 'CS 162',
};

export { exams, courses, examTypeToLabel, courseIDToLabel };
