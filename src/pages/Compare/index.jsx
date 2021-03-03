import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectComparingProducts} from '../../redux/selectors/product';
import CardsContainer from '../../containers/CardsContainer';
import {useMediaQuery} from '../../hooks/useMediaQuery';

const CompareProductsPage = ({products}) => {
    const [productCategories, setProductCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productAttributesWithValues, setProductAttributesWithValues] = useState('')
    const [totalCount, setTotalCount] = useState(0);

    const md = useMediaQuery(991);
    const xsm = useMediaQuery(420);

    useEffect(() => {
        if (products.length) {
            const categories = [];

            products.map((product) => {
                let boolean = {value: false};

                categories.map((category, index) => {
                    if (category.name === product.category.name) {
                        boolean.value = true;
                        boolean.index = index;
                    }
                });

                if (boolean.value) {
                    categories[boolean.index].count += 1;
                } else {
                    categories.push({name: product.category.name, count: 1});
                }
            });

            if (categories.length) {
                setProductCategories(categories);
                setSelectedCategory(categories[0].name);
            }
        }
    }, [products]);

    useEffect(() => {
        let count = 0;
        productCategories.map((category) => (count += category.count));

        setTotalCount(count);
    }, [productCategories]);

    console.log(products)


    useEffect(() => {

        let attributes = []
        selectedCategory === 'all'
            ? products.map(product => {
                product.characteristics.attrs.map(attr => {
                    if (!attributes.includes(attr.key)) {
                        attributes.push(attr.key)
                    }
                })
            })
            : products.map(product => {
                if (product.category.name === selectedCategory) {
                    product.characteristics.attrs.map(attr => {
                        if (!attributes.includes(attr.key)) {
                            attributes.push(attr.key)
                        }
                    })
                }
            })
        let JSXel = null
        selectedCategory === 'all'
            ? JSXel = attributes.map(attribute => {
                let attrJSX = ''
                attrJSX = products.map(product => {
                    let value = ' - '
                    product.characteristics.attrs.map(attr => {
                        if (attr.key === attribute) {
                            value = attr.value
                        }
                    })
                    return (<div
                        className=' flex m-auto h-full flex-col justify-between z-5 py-2 w-44 text-sm text-center'>{value}</div>)
                })
                return (
                    <div className='flex flex-row flex-nowrap z-0 w-auto'>
                        <div className='flex-grow-0 flex-shrink-0 w-56 mr-6'>{attribute}</div>
                        <div className='flex flex-nowrap  space-x-6 overflow-x-auto w-auto'
                             style={{width: 'calc(100% - 242px)'}}>
                            <div className='flex w-auto space-x-6 '>
                                {attrJSX}
                            </div>

                        </div>
                    </div>)
            })
            : JSXel = attributes.map(attribute => {
                let attrJSX = ''
                attrJSX = products.map(product => {
                    if (product.category.name === selectedCategory) {
                        let value = ' - '
                        product.characteristics.attrs.map(attr => {
                            if (attr.key === attribute) {
                                value = attr.value
                            }
                        })
                        return (<div
                            className=' flex m-auto h-full flex-col justify-between z-5 py-2 w-44 text-sm text-center'>{value}</div>)
                    }

                })
                return (
                    <div className='flex flex-row flex-nowrap z-0 w-auto'>
                        <div className='flex-grow-0 flex-shrink-0 w-56 mr-6'>{attribute}</div>
                        <div className='flex flex-nowrap  space-x-6 overflow-x-auto w-auto'
                             style={{width: 'calc(100% - 242px)'}}>
                            <div className='flex w-auto space-x-6 '>
                                {attrJSX}
                            </div>

                        </div>
                    </div>)
            })

        console.log(attributes)
        setProductAttributesWithValues(JSXel)
    }, [selectedCategory, products])

    return (
        <div>
            <p className="text-2xl font-bold">Сравнение товаров</p>
            <div className="flex flex-row items-center">
                {/* All the categories of products should be added below  */}
                {productCategories.map((category) => {
                    return (
                        <div
                            onClick={() => setSelectedCategory(category.name)}
                            className={`${
                                selectedCategory === category.name &&
                                'border-b-2 border-blue-400'
                            }
                            inline-block mr-4 cursor-pointer flex py-2
                            transition  duration-75 linear`}
                        >
              <span className="hover:text-blue-400 transition  duration-75 linear">
                {category.name}
              </span>
                            <span className="text-xs ml-0.5 -mt-0.5 font-bold">
                {category.count}
              </span>
                        </div>
                    );
                })}
                <div
                    onClick={() => {
                        setSelectedCategory('all');
                    }}
                    className={` ${
                        selectedCategory === 'all' && 'border-b-2 border-blue-400'
                    }
                            inline-block mr-4 cursor-pointer flex py-2 
                            transition  duration-75 linear`}
                >
          <span className="hover:text-blue-400 transition  duration-75 linear">
            All products
          </span>
                    <span className="text-xs ml-0.5 -mt-0.5 font-bold">{totalCount}</span>
                </div>
            </div>
            <div className="display"/>
            <div
                className=" flex flex-row flex-nowrap sticky -top-6 z-50  mt-6 pt-6 shadow bg-white"
                style={{zIndex: 500}}>
                <div className="flex-grow-0 flex-shrink-0 w-56 mr-6">
                    <p>Sort filters here </p>
                </div>
                <div
                    className='flex flex-nowrap overflow-x-auto w-auto'
                    // className={`select-none grid gap-1 p-4 m-auto ${
                    //     xsm ? 'grid-cols-1' : 'grid-cols-2'
                    // } sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4`}
                    style={{width: 'calc(100% - 242px)'}}
                >
                    <div className='w-auto space-x-6 flex'>
                        <CardsContainer
                            products={
                                selectedCategory === 'all'
                                    ? products
                                    : products.filter(
                                    (product) => product.category.name === selectedCategory
                                    )
                            }
                            size={md ? 'lg' : 'base'}
                            count={md ? 2 : totalCount}
                            hasBtn
                        />
                    </div>

                </div>
            </div>
            <div className="relative">
                <div className="overflow-x-auto overflow-y-visible mt-3 relative z-0">
                    <div>
                        <h2 className="text-sm font-bold">Ключевые характеристики</h2>
                    </div>
                    {productAttributesWithValues}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    products: selectComparingProducts,
});

export default connect(mapStateToProps)(CompareProductsPage);
