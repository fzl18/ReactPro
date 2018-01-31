import React from 'react';
import { List, Tabs } from 'antd-mobile';
import { connect } from 'dva';
import { withRouter } from 'react-router';
import ScienceNewsShare from '../ScienceNews/ScienceNewsShare';

class ScienceNewsIndex extends React.Component {
  state = {
    initialHeight: 176,
  }
  clickMore = () => {
    this.props.dispatch({ type: '/ScienceNews/ScienceNewsList', payload: {} });
    this.props.history.push('/ScienceNews/ScienceNewsList');
  };
  render() {
    const tabs = [
      { title: '全部',
        popularScienceCategoryId: 'ALL',
      },
    ];

    this.props.listCategory.map((value) => {
      tabs.push({
        title: value.categoryName,
        ...value,
      });
    });
    const tabDivs = tabs.map(value =>
      <div style={{ width: '100%', marginLeft: '0px', marginRight: '0px' }}>
        <ScienceNewsShare limit={6} popularScienceCategoryId={value.popularScienceCategoryId} />
      </div>,
    );

    return (
      <div>
        <List
          renderHeader={() => {
            return (<div
              className="list_header_title"style={{ fontSize: '13pt',
                fontFamily: 'Microsoft YaHei' }}
            > 科普宣教 <a
              onClick={this.clickMore} className="bar_more"style={{ fontSize: '13pt',
                fontFamily: 'Microsoft YaHei',
                color: '#333e4d' }}
            >更多&gt;</a> </div>);
          }} className="my-list"
        >

          <Tabs
            tabs={tabs}
            initialPage={0}
            // onChange={(tab, index) => { console.log('onChange', index, tab); }}
            // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            {tabDivs}
          </Tabs>
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { listCategory = [] } = state.ScienceNews || {};
  return {
    loading: state.loading.models.ScienceNews,
    listCategory,
  };
}

export default connect(mapStateToProps)(withRouter(ScienceNewsIndex));
