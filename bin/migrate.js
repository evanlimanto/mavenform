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

var _ = require('lodash');
var pg = require('pg');
var fs = require('fs');
var yaml = require('js-yaml');

/*
create table exams (
	id serial primary key,
	courseid varchar(20) not null,
	examtype varchar(20) not null,
	examid varchar(20) not null,
	problem_num integer not null,
	subproblem_num integer not null,
	problem varchar,
	solution varchar
);
*/

const config = {
  user: 'evanlimanto',
  database: 'mavenform',
  password: '',
  port: 5432,
  host: 'localhost',
  max: 5,
};

const prodConfig = {
  user: 'wywhntmgwgishp',
  database: 'd4de7agqe51r1g',
  password: '99d4da5f646a2df74a609eb8fdea8a6fe4f084b8bf8d5dd7c796d9e8f48f0a14',
  port: 5432,
  host: 'ec2-23-21-96-70.compute-1.amazonaws.com',
};

pg.defaults.ssl = true;
const Client = pg.Client;

const client = new Client(prodConfig);
client.connect();

const courseid = 'cs61c';
const examtype = 'mt1';
const examid = 'fa16';

const delq = `delete from exams where courseid = $1 and examtype = $2 and examid = $3`;
client.query({text: delq, values: [courseid, examtype, examid]})
  .then((result) => {
    console.log(result)
  });

const contents = fs.readFileSync(`${examtype}-${examid}.yml`);
let doc = null;
try {
  doc = yaml.safeLoad(contents);
} catch (e) {
  console.log(e);
  process.exit(1);
}
const results = _.map(_.filter(_.keys(doc), function(k) {
  return k.match(/^q\d_\d$/);
}), (k) => [k, _.split(k.slice(1), "_")]);
_.forEach(results, (res) => {
  const problem_num = res[1][0];
  const subproblem_num = res[1][1];
  const problem = doc[res[0]];
  const solution = doc[`${res[0]}_s`];
  const q = `
insert into exams (courseid, examtype, examid, problem_num, subproblem_num, problem, solution)
values ($1, $2, $3, $4, $5, $6, $7)
  `;
  client.query(q, [courseid, examtype, examid, problem_num, subproblem_num, problem, solution], function (err, result) {
    console.log(err, result);
  });
});

  /*
  _.forEach(exams, function (a, courseid) {
    _.forEach(a, function (b, examtype) {
      _.forEach(b, function (c, examid) {
        const profs = c.profs;
        const contents = fs.readFileSync(`src/exams/${courseid}/${examtype}-${examid}.yml`);
        const doc = yaml.safeLoad(contents);
        const results = _.map(_.filter(_.keys(doc), function(k) {
          return k.match(/^q\d_\d$/);
        }), (k) => [k, _.split(k.slice(1), "_")]);
        _.forEach(results, (res) => {
          const problem_num = res[1][0];
          const subproblem_num = res[1][1];
          const problem = doc[res[0]];
          const solution = doc[`${res[0]}_s`];
          const q = `
insert into exams (courseid, examtype, examid, problem_num, subproblem_num, problem, solution)
values ($1, $2, $3, $4, $5, $6, $7)
          `;
          client.query(q, [courseid, examtype, examid, problem_num, subproblem_num, problem, solution], function (err, result) {
            console.log(err, result);
          });
        });
      });
    });
  });
  */
