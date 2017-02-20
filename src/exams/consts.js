const classes = ['ee16a', 'cs61c'];

const captions = {
  'ee16a': 'Designing Information Devices and Systems I',
  'cs61c': 'Great Ideas in Computer Architecture (Machine Structures)',
};

const exams = {
  'ee16a': {
    'midterm-1': {
      'Fall 2016': {
        'profs': 'Ayazifar, Stojanovic',
        'url': '/exam?id=ee16afa16',
      },
      'Spring 2016': {
        'profs': 'Alon, Ayazifar',
        'url': '/exam?id=ee16asp16' ,
      },
      'Fall 2015': {
        'profs': 'Niknejad, Sahai',
        'url': '/exam?id=ee16afa15',
      },
      'Spring 2015': {
        'profs': 'Alon, Ayazifar, Subramanian',
        'url': '/exam?id=ee16asp15',
      },
    },
  },

  'cs61c': {
    'midterm-1': {
      'Fall 2016': {
        'profs': 'Boser, Katz',
        'url': '/exam?id=cs61cfa16',
      },
      'Fall 2015': {
        'profs': 'Stojanovic, Wawrzynek',
        'url': '/exam?id=cs61cfa15',
      },
    },
  },
};

export { classes, exams, captions };
