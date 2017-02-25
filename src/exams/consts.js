const exams = {
  'ee16a': {
    'midterm-1': {
      'Fall 2016': {
        'id': 'ee16afa16',
        'profs': 'Ayazifar, Stojanovic',
        'url': '/exam?id=ee16afa16',
      },
      'Spring 2016': {
        'id': 'ee16asp16',
        'profs': 'Alon, Ayazifar',
        'url': '/exam?id=ee16asp16' ,
      },
      'Fall 2015': {
        'id': 'ee16afa15',
        'profs': 'Niknejad, Sahai',
        'url': '/exam?id=ee16afa15',
      },
      'Spring 2015': {
        'id': 'ee16asp15',
        'profs': 'Alon, Ayazifar, Subramanian',
        'url': '/exam?id=ee16asp15',
      },
    },
  },

  'cs61c': {
    'midterm-1': {
      'Fall 2016': {
        'id': 'cs61cfa16',
        'profs': 'Boser, Katz',
        'url': '/exam?id=cs61cfa16',
      },
      'Spring 2016': {
        'id': 'cs61csp16',
        'profs': 'Stojanovic, Weaver',
        'url': '/exam?id=cs61csp16',
      },
      'Fall 2015': {
        'id': 'cs61cfa15',
        'profs': 'Stojanovic, Wawrzynek',
        'url': '/exam?id=cs61cfa15',
      },
      'Spring 2015': {
        'id': 'cs61csp15',
        'profs': 'Asanovic, Stojanovic',
        'url': '/exam?id=cs61csp15',
      },
      'Fall 2014': {
        'id': 'cs61cfa14',
        'profs': 'Garcia, Lustig',
        'url': '/exam?id=cs61cfa14',
      },
      'Spring 2014': {
        'id': 'cs61csp14',
        'profs': 'Garcia',
        'url': '/exam?id=cs61csp14',
      },
    },
  },

  'cs162': {
    'midterm-1': {
      'Fall 2016': {
        'id': 'cs162fa16',
        'profs': 'Joseph',
        'url': '/exam?id=cs162fa16',
      },
    },
  },
};

const addedClasses = ['ee16a', 'cs61c', 'cs162'];
const remainingClasses = [];

const captions = {
  'ee16a': 'Designing Information Devices and Systems I',
  'cs61c': 'Great Ideas in Computer Architecture (Machine Structures)',
  'cs162': 'Test',
};

export { exams, captions };
