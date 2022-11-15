export const checkPositiveColumn = (column) =>{
  switch(column){
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return null;
    default:
      return null;
  }
}

export const checkNegativeColumn = (column) =>{
  switch(column){
    case 0:
      return null;
    case 1:
      return 0;
    case 2:
      return 1;
    case 3:
      return 2;
    default:
      return null;
  }
}
