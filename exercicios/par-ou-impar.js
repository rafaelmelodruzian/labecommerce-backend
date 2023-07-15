function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const parOuImpar = (a, b) => {
    const nPC = numeroAleatorio(1, 6);
    const usuario = [a, Number(b)];
    const computador = [usuario[0] === "impar" ? "par" : "impar", nPC];
  
    const vencedor = (usuario[0] === "par" && (usuario[1] + computador[1]) % 2 === 0) ||
    (usuario[0] === "impar" && (usuario[1] + computador[1]) % 2 !== 0)
    ? "Você" : "Computador";
  
    console.log(`
     Você escolheu: ${usuario[0]}.
     Computador escolheu: ${computador[0]}.
     O resultado foi: ${usuario[1] + computador[1]}.
     ${vencedor} venceu ! 
      `);
  };
  
  parOuImpar(process.argv[2], process.argv[3]);