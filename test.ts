function sql(strings: TemplateStringsArray, ...args: any[]): string {
  return strings.map((str, i) => str + (args[i] || "")).join("");
}

function call(a = 1, b = 2) {
  return sql`INSERT INTO table_name (col_1, col_2) VALUES (${a}, ${b})`;
}

console.log("call(): ", call(2, 3));
