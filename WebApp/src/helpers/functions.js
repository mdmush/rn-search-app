function search(data, text) {
  try {
    return new Promise((resolve, reject) => {
      let searchedUser = null;
      let searchedIndex = null;
      data.forEach((d, dIndex) => {
        if (d.name.toLowerCase().includes(text.toLowerCase())) {
          searchedUser = d;
          searchedIndex = dIndex;
        }
      });
      if (searchedUser !== null) {
        if (searchedIndex > 9) {
          resolve({searchedData: [
            ...data.slice(0, 9),
            {...searchedUser, rank: searchedIndex, isSearchedUser: true},
          ], error: false});
        } else {
          data[searchedIndex] = {
            ...searchedUser,
            rank: searchedIndex,
            isSearchedUser: true,
          };
          resolve({searchedData: data.slice(0, 10), error: false});
        }
      } else {
        resolve({searchedData: data.slice(0, 10), error: true, errorText: 'User Not Found'});
      }
    });
  } catch (error) {
    return({searchedData: data.slice(0, 10), error: true, errorText: 'Data Error!'});
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
