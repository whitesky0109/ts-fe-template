export function createElement(tagName: string, classes: string[] = []) {
  const result = document.createElement(tagName);
  result.classList.add(...classes);

  return result;
}
