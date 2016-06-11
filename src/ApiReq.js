import md5 from 'md5'



const ENDPOINT                    = "http://api.cnbeta.com/capi";
const APP_KEY                     = "10000";
const FORMAT                      = "json";
const V                           = "1.0";
const EXTRA                       = "mpuffgvbvbttn3Rc";

const KEY_METHOD                  = "method";
const KEY_END_SID                 = "end_sid";
const KEY_TOPICID                 = "topicid";
const KEY_RANK_TYPE               = "type";
const KEY_SID                     = "sid";
const KEY_PAGE                    = "page";
const KEY_PAGE_SIZE               = "pageSize";
const KEY_OP                      = "op";
const KEY_TID                     = "tid";
const KEY_PID                     = "pid";

const VALUE_PAGE_SIZE             = "20";

const baidu_url                   = "http://baidu.com/"
const METHOD_NEWS_LISTS           = "Article.Lists";
const METHOD_NEWS_CONTENT         = "Article.NewsContent";
const METHOD_TOP_TEN              = "Article.Top10";
const METHOD_NEWS_COMMENT         = "Article.Comment";
const METHOD_RECOMMEND_COMMENT    = "Article.RecommendComment";
const METHOD_DO_COMMENT           = "Article.DoCmt";
const METHOD_DAY_RANK             = "Article.TodayRank";


export default new class ApiReq  {

    constructor() {

    }

    assembleParam(params){

        let s                     = [];
        for(let k in params){
            let v                 = params[k]
            s.push(k)
            s.push('=')
            s.push(v)
            s.push('&')
        }
        s                         = s.join("")
        s                         = s + EXTRA;
        return s
    }

    buildUrl(params){

        let paramString           = this.assembleParam(params)
        let sign                  = md5(paramString);
        return ENDPOINT + "?" + paramString + "&sign=" + sign;

    }

    sortByAlphaKey(o) {
      return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
    }



    urlArticles(){

        let timestamp             = new Date().getTime();
        let params                = {
            "app_key"             : APP_KEY,
            "format"              : FORMAT,
            "timestamp"           : timestamp,
            "v"                   : V,
        };

        let method_param  = {
          "method"                : METHOD_NEWS_LISTS,
        }

        let params_res            = Object.assign(params, method_param);
        params_res                = this.sortByAlphaKey(params_res);

        let urlString             = this.buildUrl(params_res);
        // console.log(urlString)

        return urlString;
    }


}
