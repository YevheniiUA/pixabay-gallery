const baseUrl = 'https://pixabay.com/api/';

export default {
  page: 1,
  query: '',
  fetchImages() {
    const options = {
      headers: {
        Authorization: '12932265-6a67b47d81c2d99d25931322f',
      },
    };

    const requestParams = `?q=${this.query}&page=${this.page}&pageSize=10`;

    return fetch(baseUrl + requestParams, options)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();

        return parsedResponse;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
