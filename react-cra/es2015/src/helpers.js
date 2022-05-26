const choice = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const remove = (items, item) => {
  let idx = items.indexOf(item);
  if (idx === -1) {
    return undefined;
  } else {
    let removed = items[idx];
    items.splice(idx, 1);
    return removed;
  }
};

export { choice, remove };
