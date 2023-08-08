import Block from '../utils/core/Block';
import Route from './route';

class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  private onRoutedCallback: (route: Route) => void = () => {};

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      throw new Error('Instance already exists.');
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public exists(pathname: string) {
    return !!this.routes.find((x) => x.pathname === pathname);
  }

  public setOnRoutedCallback(callback: (route: Route) => void) {
    this.onRoutedCallback = callback;
    return this;
  }

  public start() {
    // запустить роутер
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
    this.onRoutedCallback(route);
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    // переход назад по истории браузера
    window.history.back();
  }

  public forward() {
    // переход вперёд по истории браузера
    window.history.forward();
  }

  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

const router = new Router('#app');
export default router;
