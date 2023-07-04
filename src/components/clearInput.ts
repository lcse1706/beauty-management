// export const clearInput = (...args: string[]): any => {
//   console.log(args)

//   return args.map((arg) => {
//     console.log(arg);
//     return (arg = '');
//   });
// };

//TODO zapytac czy jest wykonalne stworzyc zewnetrzna funckcje czyszczacą

export const clearInput = (input: string): string => {
  return (input = '');
};
