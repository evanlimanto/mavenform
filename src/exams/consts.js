const exams = {
  'chem1a': {
    'mt2': {
      'sp13': {
        'term': 'Spring 2013',
        'profs': 'Pines',
      },
      'fa11': {
        'term': 'Fall 2011',
        'profs': 'Arnold',
      },
      'sp11': {
        'term': 'Spring 2011',
        'profs': 'Nitsche',
      },
      'fa10': {
        'term': 'Fall 2010',
        'profs': 'Stacy',
      },
    }
  },

  'data8': {
    'mt1': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Adhikari'
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'DeNero, Adhikari, Jordan, Parikh, Wagner'
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Adhikari'
      }
    }
  },

  'cs170': {
    'mt2': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Papadimitriou, Trevisan',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Chiesa, Vazirani',
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Garg, Raghavendra',
      },
      'fa14': {
        'term': 'Fall 2014',
        'profs': 'Wagner',
      },
    }
  },

  'cs186': {
    'mt1': {
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Hellerstein',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Hellerstein',
      },
      'fa12': {
        'term': 'Fall 2012',
        'profs': 'Franklin',
      },
      'sp12': {
        'term': 'Spring 2012',
        'profs': 'Hellerstein',
      },
    },
    'mt2': {
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Hellerstein',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Hellerstein',
      },
    },
  },

  'cs188': {
    'mt1': {
      'su16': {
        'term': 'Summer 2016',
        'profs': '-',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Abbeel',
      },
      'su15': {
        'term': 'Summer 2015',
        'profs': '-',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Abbeel',
      },
    }
  },

  'cs189': {
    'mt1': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Recht',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Shewchuk',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Efros, Bartlett',
      },
      'sp14': {
        'term': 'Spring 2014',
        'profs': 'Shewchuk',
      },
    },
  },

  'ugba10': {
    'marketing': {
      'sp16p': {
        'term': 'Spring 2016',
        'profs': 'Briginshaw',
        'note': 'Practice'
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Briginshaw'
      },
      'sp11': {
        'term': 'Spring 2011',
        'profs': 'Robinson'
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Hopelain',
        'note': 'Exam Only'
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': '-',
        'note': 'Exam Only'
      },
    }
  },

  'ee16a': {
    'mt2': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Ayazifar, Stojanovic',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Ayazifar, Stojanovic',
      },
    },
    'mt1': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Ayazifar, Stojanovic',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Alon, Ayazifar',
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Niknejad, Sahai',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Alon, Ayazifar, Subramanian',
      },
    }
  },

  'cs61a': {
    'mt2': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'DeNero',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Hilfinger',
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'DeNero',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'DeNero',
      },
      'fa14': {
        'term': 'Fall 2014',
        'profs': 'DeNero',
      },
    }
  },

  'cs61c': {
    'mt1': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Boser, Katz',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Stojanovic, Weaver',
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Stojanovic, Wawrzynek',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Asanovic, Stojanovic',
      },
      'fa14': {
        'term': 'Fall 2014',
        'profs': 'Garcia, Lustig',
      },
      'sp14': {
        'term': 'Spring 2014',
        'profs': 'Garcia',
      },
    }
  },

  'cs162': {
    'mt1': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Joseph',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Joseph',
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Kubiatowicz',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Kubiatowicz',
      },
    }
  }
};

const courses = {
  'cs189': 'Introduction to Machine Learning',
  'cs61a': 'The Structure and Interpretation of Computer Programs',
  'cs188': 'Introduction to Artificial Intelligence',
  'cs170': 'Efficient Algorithms and Intractable Problems',
  'ee16a': 'Designing Information Devices and Systems I',
  'data8': 'Foundations of Data Science',
  'cs186': 'Introduction to Database Systems',
  'ugba10': 'Principles of Business',
  'cs61c': 'Great Ideas in Computer Architecture (Machine Structures)',
  'cs162': 'Operating Systems and Systems Programming',
  // 'chem1a': 'General Chemistry',
};

const examTypeToLabel = {
  'marketing': 'Marketing',
  'marketingp': 'Marketing - Practice',
  'finance': 'Finance',

  'mt1': 'Midterm 1',
  'mt2': 'Midterm 2',
  'final': 'Final',
}

const termToLabel = {
  'sp10': 'Spring 2010',
  'fa10': 'Fall 2010',
  'sp11': 'Spring 2011',
  'fa11': 'Fall 2011',
  'sp12': 'Spring 2012',
  'fa12': 'Fall 2012',
  'sp13': 'Spring 2013',
  'fa13': 'Fall 2013',
  'sp14': 'Spring 2014',
  'fa14': 'Fall 2014',
  'sp15': 'Spring 2015',
  'su15': 'Summer 2015',
  'fa15': 'Fall 2015',
  'sp16': 'Spring 2016',
  'su16': 'Summer 2016',
  'fa16': 'Fall 2016',
};

const courseIDToLabel = {
  'data8': 'Data 8',
  'cs186': 'CS 186',
  'ee16a': 'EE 16A',
  'cs61a': 'CS 61A',
  'cs61c': 'CS 61C',
  'cs162': 'CS 162',
  'cs170': 'CS 170',
  'cs188': 'CS 188',
  'cs189': 'CS 189',
  'ugba10': 'UGBA 10',
  // 'chem1a': 'Chem 1A',
};

export { exams, courses, examTypeToLabel, courseIDToLabel, termToLabel };
