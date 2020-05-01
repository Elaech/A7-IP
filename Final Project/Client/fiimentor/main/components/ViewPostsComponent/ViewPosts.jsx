import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {TableContainer, TheadStyled, ThStyled, TrowStyled} from './ViewPostsStyle';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import type {SearchedPostsState} from '../../store/Post/searchPostReducer';
import type {SearchRequest} from '../../core/services/ApiService';
import type {AppState} from '../../store/AppState';
import {searchPostThunk} from '../../store/Post/searchPostThunk';
import {connect} from 'react-redux';
import {SearchPostRequest} from '../../core/domain/SearchPostRequest';
import moment from 'moment';

interface StateProps {
  searchedPosts: SearchedPostsState;
}

interface DispatchProps {
  searchPosts(searchReq: SearchRequest):void;
}

type Props = StateProps & DispatchProps;

class UnconnectedViewPosts extends React.Component<Props> {

  componentDidMount(){
    const request = {
      page: SearchPostRequest.defaultPage,
      size: SearchPostRequest.defaultSize,
      queryParam: '',
      toFrom: 'All',
      postedByMe: false,
      isAnonymous: false,
    };

    const {searchPosts} = this.props;

    const authorization = localStorage.getItem('userToken');

    searchPosts(request, authorization);
  }

  render() {
    const {searchedPosts} = this.props;

    if(!searchedPosts) {
     return <div>Loading...</div>
    }

    return (
          <Table>
            <TheadStyled>
                <ThStyled>Titlu</ThStyled>
                <ThStyled>Data</ThStyled>
                <ThStyled>Autor</ThStyled>
            </TheadStyled>
            <TableBody>
              {searchedPosts.map((post, index) => (
                  <TrowStyled key={index}>
                    <td>{post.title}</td>
                    <td>{moment(post.timestamp).format('MMMM Do YYYY, hh:mm')}</td>
                    <td>{post.author}</td>
                  </TrowStyled>
              ))}
            </TableBody>
          </Table>
    );
  }
}

const mapStateToProps = ({searchedPosts}: AppState): StateProps => ({
  searchedPosts,
});

const mapDispatchToProps: DispatchProps = {
  searchPosts: searchPostThunk,
};

export const ViewPosts =  connect(mapStateToProps, mapDispatchToProps)(UnconnectedViewPosts);
