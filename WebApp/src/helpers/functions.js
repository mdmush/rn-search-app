function search(data, text) {
  try {
    return new Promise((resolve, reject) => {
      let searchedUser = null;
      let searchedIndex = null;
      data.map((d, dIndex) => {
        if (d.name.includes(text)) {
          searchedUser = d;
          searchedIndex = dIndex;
        }
      });
      if (searchedUser !== null) {
        if (searchedIndex > 9) {
          resolve([
            ...data.slice(0, 9),
            {...searchedUser, rank: searchedIndex, isSearchedUser: true},
          ]);
        } else {
          data[searchedIndex] = {
            ...searchedUser,
            rank: searchedIndex,
            isSearchedUser: true,
          };
          resolve(data.slice(0, 10));
        }
      } else {
        resolve(data.slice(0, 10));
      }
    });
  } catch (error) {
    return [];
  }
}

function sort(data) {
  try {
    return new Promise((resolve, reject) => {
      data.sort(function (x, y) {
        let a = x.bananas;
        let b = y.bananas;
        return b - a;
      });
      resolve(data);
    });
  } catch (error) {
    return [];
  }
}

export {search, sort};
