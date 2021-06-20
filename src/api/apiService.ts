import { manageCountriesList } from '../store/dataSlice';
import { setLoading } from '../store/infoSlice';
import store from '../store/store';
import type { Country, SortedByRegion } from '../types';

const endpointAll = 'https://restcountries.eu/rest/v2/all';

const apiSerice = (): void => {
  store.dispatch(setLoading(true));
  fetch(endpointAll)
    .then((response) => response.body)
    // eslint-disable-next-line
    .then((rb) => {
      if (rb) {
        const reader = rb.getReader();
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  // console.log('done', done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                //  console.log(done, value);
                push();
              });
            }

            push();
          },
        });
      }
    })
    .then((stream) =>
      new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()
    )
    .then((result) => {
      const countriesList: Country[] = JSON.parse(result);
      const data = formatInitialData(countriesList);
      store.dispatch(manageCountriesList(data));
      store.dispatch(setLoading(false));
    });
};

export default apiSerice;

function formatInitialData(data: Country[]): SortedByRegion {
  const countriesByRegion: SortedByRegion = {};
  const has = Object.prototype.hasOwnProperty;
  data.forEach((el) => {
    const { name, population, region } = el;
    if (has.call(countriesByRegion, region)) {
      countriesByRegion[region].push({ name, population });
    } else {
      countriesByRegion[region] = [];
      countriesByRegion[region].push({ name, population });
    }
  });
  return countriesByRegion;
}
