// ! на самом деле здесь проблема не только в том, что ArticleSortSelector, ArticleTypeTabs, ArticleViewSelector - это фичи (мы это поправили)
// ! ArticleDetails скорее вообще виджет, но никак не сущность. Слишком там много всего происходит
// ! ArticleList тоже скорее всего виджет, в котором используется сущность ArticleListItem
// ! по большому счету сущностями здесь можно назвать ArticleCodeBlockComponent, ArticleImageBlockComponent, ArticleTextBlockComponent,
// ! ArticleListItem

export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export type { Article } from './model/types/article';
export type { ArticleDetailsScheme } from './model/types/articleDetailsScheme';
export { ArticleList } from './ui/ArticleList/ArticleList';
export { getArticleDetailsData } from './model/selectors/articleDetails';

export {
	ArticleView,
	ArticleSortField,
	ArticleType,
	ArticleBlockType,
} from './model/consts/consts';
