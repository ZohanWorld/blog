/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom'
import '../style/article-card.scss'
import { useDispatch, useSelector } from 'react-redux'

import { addToFavourite, removeFromFavourite } from '../store/dataSlice'

function ArticleCard({ content }) {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleFavourite = () => {
    if (user) {
      if (content.favorited) {
        dispatch(removeFromFavourite(content.slug))
        return
      }
      dispatch(addToFavourite(content.slug))
    }
  }

  return (
    <article className="article-card">
      <div className="arcticle-info">
        <div className="arcticle-info__title">
          <Link to={`post/${content.slug}`}>
            <h2 className="arcticle-info__title-text">{content.title}</h2>
          </Link>
          <label className="arcticle-info__likes" htmlFor="likes">
            <button
              type="button"
              id="likes"
              className={`arcticle-info__likes-button${content.favorited ? '--full' : ''}`}
              onClick={handleFavourite}
            />
            {content.favoritesCount}
          </label>
        </div>
        <div>
          {content.tagList.map((value, index) => {
            return (
              <span className="arcticle-info__tag" key={value + index}>
                {value}
              </span>
            )
          })}
        </div>
        <p className="arcticle-info__description">{content.description}</p>
      </div>
      <div className="author">
        <div className="author__info">
          <p className="author__name">{content.author.username}</p>
          <p className="author__date">Feb 22, 2020</p>
        </div>
        <img src={content.author.image} alt="" className="author__avatar" />
      </div>
    </article>
  )
}

export default ArticleCard
