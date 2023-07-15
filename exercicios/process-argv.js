console.log("Alo aqui é do process-argv");

const returnator = (a, b) => {
  console.log(`1º argumento: ${a}. 2º argumento: ${b} `);
};

returnator(process.argv[2], process.argv[3]);
