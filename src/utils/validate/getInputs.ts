export default function getInputsData() {
  const inputArr = Array.from(document.getElementsByTagName('INPUT'));
  const inputs = inputArr.map((i) => i as HTMLInputElement).map((i) => [i.name, i.value]);
  const data = Object.fromEntries(inputs);
  return data;
}
