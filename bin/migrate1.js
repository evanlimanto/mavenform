const _ = require('lodash');
const pg = require('pg');

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

  'cs70': {
    'mt2': {
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Walrand, Rao',
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Walrand, Rao',
      },
      'fa14': {
        'term': 'Fall 2014',
        'profs': 'Sahai',
      },
      'sp14': {
        'term': 'Spring 2014',
        'profs': 'Sahai'
      },
    }
  },

  'cs161': {
    'mt2': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Popa, Weaver',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Popa, Wagner',
      },
      'sp14': {
        'term': 'Spring 2014',
        'profs': 'Popa, Wagner',
      }
    }
  },

  'cs170': {
    'mt2': {
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
      'sp16p': {
        'term': 'Spring 2016',
        'profs': 'Alon, Ayazifar',
        'note': 'Practice',
      },
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Ayazifar, Stojanovic',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Ayazifar, Stojanovic',
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Sahai, Niknejad',
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

  'ee16b': {
    'final': {
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Sahai, Maharbiz',
      },
    },
    'mt2': {
      'sp17p': {
        'term': 'Spring 2017',
        'profs': 'Arcak, Maharbiz',
        'note': 'Practice',
      },
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Sahai, Maharbiz',
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Alon, Ayazifar, Tomlin, Ranade',
      }
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

  'cs61b': {
    'mt2': {
      'sp16': {
        'term': 'Spring 2016',
        'profs': 'Hug',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Hug',
      }
    }
  },

  'cs61c': {
    'mt2': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Katz, Boser',
      },
      'fa15': {
        'term': 'Fall 2015',
        'profs': 'Stojanovic, Wawrzynek'
      },
      'su15': {
        'term': 'Summer 2015',
        'profs': 'Karandikar',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Asanovic, Stojanovic',
      }
    },
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
    },
  },

  'cs162': {
    'mt3': {
      'fa16': {
        'term': 'Fall 2016',
        'profs': 'Joseph',
      }
    },
    'mt2': {
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
        'profs': 'Joseph',
      },
      'sp15': {
        'term': 'Spring 2015',
        'profs': 'Kubiatowicz',
      }
    },
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

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

const stagingConfig = {
  user: 'qrykorzlcooyev',
  database: 'd5956a3il3svmp',
  password: 'a98b8a5c9c43e32cf55e8a2a29f639f5f65751b580a26300b26ccb5d815aea13',
  port: 5432,
  host: 'ec2-23-21-96-70.compute-1.amazonaws.com',
};

const prodConfig = {
  user: 'wywhntmgwgishp',
  database: 'd4de7agqe51r1g',
  password: '99d4da5f646a2df74a609eb8fdea8a6fe4f084b8bf8d5dd7c796d9e8f48f0a14',
  port: 5432,
  host: 'ec2-23-21-96-70.compute-1.amazonaws.com',
};

const type = 3;

if (type === 2 || type === 3) {
  pg.defaults.ssl = true;
}
const Client = pg.Client;

let client = null;
if (type === 1) {
  client = new Client(config);
} else if (type === 2) {
  client = new Client(stagingConfig);
} else if (type === 3) {
  client = new Client(prodConfig);
}
client.connect();

const qq = `
  alter table content drop COLUMN if exists exam;
  drop table exams;
  create table exams (
    id serial primary key,
    courseid varchar(20) not null,
    examtype varchar(20) not null,
    examid varchar(20) not null,
    profs varchar(50)
  );
`;
client.query(qq, function(err, result) {
  if (err) console.log(err);
  console.log(result);
});

var counter = 0;
_.forEach(exams, (a, courseid) => {
  _.forEach(a, (b, examtype) => {
    _.forEach(b, (c, examid) => {
      const d = `delete from exams where courseid = $1 and examtype = $2 and examid = $3`;
      client.query(d, [courseid, examtype, examid], function(err, result) {
        console.log("Running Query #", ++counter);
        if (err) console.log(err);
      });
      const q = `insert into exams (courseid, examtype, examid, profs) VALUES ($1, $2, $3, $4)`;
      client.query(q, [courseid, examtype, examid, c.profs], function (err, result) {
        console.log("Running Query #", ++counter);
        if (err) console.log(err);
      });
    });
  });
});

const qqq = `
  alter table content add column exam integer references exams (id)
`;
client.query(qqq, function(err, result) {
  if (err) console.log(err);
  console.log(result);
});

const qqqq = `
  update content C set exam = (select id from exams E where courseid = C.courseid and examtype = C.examtype and examid = C.examid);
  alter table content drop column courseid;
  alter table content drop column examtype;
  alter table content drop column examid;
`;
client.query(qqqq, function(err, result) {
  if (err) console.log(err);
  console.log(result);
});
