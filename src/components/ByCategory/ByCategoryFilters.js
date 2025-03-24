import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getCategoryIcon from 'common/utils/getCategoryIcon'
import getIcon from 'common/utils/getIcon'

function ByCategoryFilters({
  categories,
  currentCategory,
  currentParentCategory,
  searchType,
  kids,
  sitename,
}) {
  const getParentCategoriesList = () =>
    categories.map((category) => (
      <li
        key={category.id}
        id={`SearchFilter${category.id}`}
        className="inline-block lg:block transition duration-500 ease-in-out lg:my-2 lg:mx-5 grow "
      >
        <Link
          className="transition duration-500 ease-in-out flex items-center cursor-pointer rounded-lg text-charcoal-700"
          to={`/${sitename}/${kids ? 'kids/' : ''}categories/${
            category.id
          }?types=${searchType}`}
        >
          {getCategoryIcon(
            category.title,
            'inline-flex p-2 rounded-lg fill-current h-10 w-14',
          )}
          <div className="inline-flex text-lg font-medium">
            {category.title}
          </div>
        </Link>
      </li>
    ))

  return (
    <div data-testid="ByCategoryFilters">
      <div className="inline-block lg:block lg:px-3 lg:pt-3 print:hidden">
        <ul
          className={`list-none m-2 px-2 lg:space-y-2 ${
            currentCategory?.id === currentParentCategory?.id
              ? 'border-l-4 md:border-l-0 lg:border-l-4 border-charcoal-700'
              : ''
          }`}
        >
          <li
            key={currentParentCategory.id}
            id={`SearchFilter${currentParentCategory.id}`}
            className="inline-block md:inline-flex lg:block w-full md:w-auto lg:w-full transition duration-500 ease-in-out lg:my-2 grow"
          >
            <Link
              className="transition duration-500 ease-in-out rounded-lg pr-4 flex items-center cursor-pointer text-charcoal-700 bg-charcoal-200"
              to={`/${sitename}/${kids ? 'kids/' : ''}categories/${
                currentParentCategory.id
              }?types=${searchType}`}
            >
              {getCategoryIcon(
                currentParentCategory.title,
                'inline-flex p-2 rounded-lg fill-current h-10 w-14',
              )}
              <div className="inline-flex text-lg font-medium">
                {currentParentCategory.title}
              </div>
            </Link>
          </li>
          {currentParentCategory?.children?.length > 0
            ? currentParentCategory?.children?.map((child) => (
                <li
                  key={child.id}
                  id={`SearchFilter${child.id}`}
                  className={`inline-block md:inline-flex lg:block w-full md:w-auto lg:w-full transition duration-500 ease-in-out lg:my-2 grow ${
                    child.id === currentCategory.id
                      ? 'border-l-4 md:border-l-0 lg:border-l-4 border-charcoal-700'
                      : ''
                  }`}
                >
                  <Link
                    className={`transition duration-500 ease-in-out ml-4 lg:ml-8 pr-4 lg:px-0 rounded-lg flex items-center cursor-pointer text-charcoal-700 ${
                      child.id === currentCategory.id ? 'bg-charcoal-200' : ''
                    }`}
                    to={`/${sitename}/${kids ? 'kids/' : ''}categories/${
                      child.id
                    }?types=${searchType}`}
                  >
                    {getIcon(
                      'Placeholder',
                      'inline-flex p-2 rounded-lg fill-current h-10 w-0',
                    )}
                    <div className="inline-flex text-lg font-medium">
                      {child.title}
                    </div>
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="hidden lg:block lg:p-3">
        <ul className="list-none m-2 pt-5 lg:space-y-4 border-t-2 border-charcoal-200">
          {getParentCategoriesList()}
        </ul>
      </div>
    </div>
  )
}
// PROPTYPES
const { array, bool, object, string } = PropTypes
ByCategoryFilters.propTypes = {
  categories: array,
  currentCategory: object,
  currentParentCategory: object,
  searchType: string,
  kids: bool,
  sitename: string,
}

export default ByCategoryFilters
