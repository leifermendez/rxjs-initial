import { delay, filter, fromEvent, map, of, single, take, tap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { carFrom$, state$ } from "./utils/mockData";
import "./styles/main.scss";

(function () {
  /**
   * Zona de declaracion de elementos HTML
   */

  const modelTitle: HTMLElement = document.querySelector(".model-title");
  const modelSubTitle: HTMLElement = document.querySelector(".model-subtitle");
  const loadingLayer: HTMLElement = document.querySelector(".loading");
  const modelHighLight: HTMLElement =
    document.querySelector(".model-highlight");
  const modelColors: HTMLElement = document.querySelector(".model-colors");
  const carImage: HTMLElement = document.querySelector(".car-image");

  /**
   * Logica Observables
   */

  const source$ = carFrom$.pipe(
    delay(2500),
    tap(() => {
      loadingLayer.style.display = "none";
    })
  );

  const title$ = source$.pipe(
    map((all) => {
      return all.name.toUpperCase();
    })
  );

  const subTitle$ = source$.pipe(
    map((all) => {
      return all.description;
    })
  );

  const highlight$ = source$.pipe(
    map((allRaw) => {
      const mapHighLigh = allRaw.highlight.map((item: any) => {
        return `<div class="text-center">
                <div>
                  <h2>${item.amount}<small>${item.symbol}</small></h2>
                </div>
                <div><small class="text-muted d-flex d-flex-wrap box-feature">${item.short}</small></div>
              </div>`;
      });

      return mapHighLigh;
    })
  );

  const colors$ = source$.pipe(
    map((allRaw) => {
      const mapColors = allRaw.colors.map((item: any) => {
          const isColor = (state$.getValue().color === item.name) ? 'active' : ''
        return `<span class="click-color ${item.name} ${isColor}"></span>`;
      });

      return mapColors;
    })
  );

  const colorsClick$ = fromEvent(modelColors, "click").pipe(
    tap(() => {
        modelColors.childNodes.forEach((colorChild:HTMLElement) => {
            const [,color] = colorChild.classList.toString().split(' ');//click-color, white
            carImage.classList.remove(color)
            colorChild.classList.remove('active')
        })
    }),
    map((colorEvent: MouseEvent) => colorEvent.target),
    filter((colorTarget: HTMLElement) => {
      const classList = colorTarget.classList.toString();
      return classList.includes("click-color");
    }),
    map((colorTarget: HTMLElement) => {
        colorTarget.classList.add('active')
        const [,color] = colorTarget.classList.toString().split(' ');//click-color, white
        return color
    })
  );

  /**
   * Subscribe
   */

  title$.subscribe((title) => (modelTitle.innerHTML = title));

  subTitle$.subscribe((subTitle) => (modelSubTitle.innerHTML = subTitle));

  highlight$.subscribe(
    (highlight) => (modelHighLight.innerHTML = highlight.join(""))
  );

  colors$.subscribe((colors) => (modelColors.innerHTML = colors.join("")));

  colorsClick$.subscribe((color: string) => {
        state$.next({color})
  });

  /**
   * State de la APP
   */

   state$.subscribe(({color}) => {
     
       carImage.classList.add(color)
       console.log('Este es el color del momento ',color)
   })


})();
