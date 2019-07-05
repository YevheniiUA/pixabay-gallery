export default {
  baseUrl: 'https://pixabay.com/api/',
  page: 1,
  query: '',
  apiKey: '12932265-6a67b47d81c2d99d25931322f',
  fetchImages() {
    const requestParams = `?key=${this.apiKey}&q=${this.query}&page=${
      this.page
    }&per_page=9`;

    return fetch(this.baseUrl + requestParams)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();

        return parsedResponse.hits;
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
