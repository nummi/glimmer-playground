export default function([target]) {
  return `
    position: fixed;
    top: ${target.top + target.height}px;
    left: ${target.left + target.width - 150}px
  `;
}