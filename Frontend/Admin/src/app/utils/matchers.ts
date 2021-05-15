import { UrlSegment } from "@angular/router";

export function userViewMatcher(url: UrlSegment[]) {
    const path = url[0]?.path || '';
    if(path.includes('users') || path.includes('techs')){
      return {consumed: url};
    }
    return null;
}