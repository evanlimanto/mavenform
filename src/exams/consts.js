const courses = {
  'cs170': 'Efficient Algorithms and Intractable Problems',
  'cs70': 'Discrete Mathematics and Probability Theory',
  'ee16a': 'Designing Information Devices and Systems I',
  'cs162': 'Operating Systems and Systems Programming',
  'ee16b': 'Designing Information Devices and Systems II',
  'cs61b': 'Data Structures',
  'cs161': 'Computer Security',
  'cs189': 'Introduction to Machine Learning',
  'cs61a': 'The Structure and Interpretation of Computer Programs',
  'cs188': 'Introduction to Artificial Intelligence',
  'data8': 'Foundations of Data Science',
  'cs186': 'Introduction to Database Systems',
  'ugba10': 'Principles of Business',
  'cs61c': 'Great Ideas in Computer Architecture (Machine Structures)',
};

const courseIsFeatured = {
  'cs170': false,
  'cs70': false,
  'ee16a': false,
  'cs162': true,
  'ee16b': false,
  'cs61b': false,
  'cs161': false,
  'cs189': false,
  'cs61a': false,
  'cs188': false,
  'data8': false,
  'cs186': false,
  'ugba10': false,
  'cs61c': false,
};

const examTypeToLabel = {
  'marketing': 'Marketing',
  'marketingp': 'Marketing - Practice',
  'finance': 'Finance',

  'mt1': 'Midterm 1',
  'mt2': 'Midterm 2',
  'mt3': 'Midterm 3',
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
  'sp17p': 'Spring 2017 - Practice',
};

const courseIDToLabel = {
  'data8': 'Data 8',
  'cs70': 'CS 70',
  'cs186': 'CS 186',
  'ee16a': 'EE 16A',
  'ee16b': 'EE 16B',
  'cs61a': 'CS 61A',
  'cs61b': 'CS 61B',
  'cs61c': 'CS 61C',
  'cs161': 'CS 161',
  'cs162': 'CS 162',
  'cs170': 'CS 170',
  'cs188': 'CS 188',
  'cs189': 'CS 189',
  'ugba10': 'UGBA 10',
};

export { courses, examTypeToLabel, courseIDToLabel, courseIsFeatured, termToLabel };
