import css from './style.module.css';
import {useState} from 'react';
import svg from './../../assets/svg/index';
function Functions({title, handleSubmitSearch, setShowAddNewPopup}) {
    const [searchValue, setSearchValue] = useState('');
    return (
        <>
            <h3 className={css.title}>{title}</h3>
            <div className='row-wrapper'>
                <form className={css['search-container']} onSubmit={(e) => handleSubmitSearch(e, searchValue)}>
                    <input
                        type='text'
                        placeholder='Nhập từ khóa'
                        className={css['search-input']}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <img src={svg.search} alt='image' />
                </form>
                <button className='btn-purple' onClick={() => setShowAddNewPopup(true)}>
                    <img src={svg.add} alt='image' />
                    Thêm mới
                </button>
            </div>
        </>
    );
}

export default Functions;
