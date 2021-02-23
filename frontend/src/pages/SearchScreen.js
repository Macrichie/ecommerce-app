import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { prices, ratings } from "../utils.js";
import Rating from "../components/Rating";

export default function SearchScreen(props) {
  // if there is no name, category, min, max specified, use defaults
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
  } = useParams(); // from react-router-dom
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="department">{products.length} Results</div>
        )}
        <div>
          Sort by{" "}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3 className="department">Department</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul className="department">
                <li>
                  <Link
                    className={"all" === category ? "active" : ""}
                    to={getFilterUrl({ category: "all" })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      className={cat === category ? "active" : ""}
                      to={getFilterUrl({ category: cat })}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="department">Price</h3>
            <ul className="department">
              {prices.map((price) => (
                <li key={price.name}>
                  <Link
                    // if minPrice-maxPrice is equal to selected min-max, make add active style
                    className={
                      `${price.min}-${price.max}` === `${min}-${max}`
                        ? "active"
                        : ""
                    }
                    to={getFilterUrl({ min: price.min, max: price.max })}
                  >
                    {price.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="department">Avg. Customer Review</h3>
            <ul className="department">
              {ratings.map((rating) => (
                <li key={rating.name}>
                  <Link
                    className={
                      `${rating.rating}` === `${rating}` ? "active" : ""
                    }
                    to={getFilterUrl({ rating: rating.name })}
                  >
                    <Rating caption={" & up"} rating={rating.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>
              <>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}
                <div className="row center">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
