import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {TableContainer} from './ViewPostsStyle';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function createData(title, date, autor) {
  return { title, date, autor};
}

const rows = [
  createData('Postare #1', 'Gigel Mirel', '15/04/2020'),
  createData('Postare #2', 'Florel Irinel', '29/05/2020'),
  createData('Postare #3', 'Patrascu Ion', '12/02/2020'),
  createData('Postare #4', 'Andrei Gigi', '7/04/2020'),
  createData('Postare #5', 'Parcalab Matei', '19/04/2020'),
];

export default function PostsTable() {

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titlu</TableCell>
            <TableCell align="right">Autor</TableCell>
            <TableCell align="right">Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell ><h4>{row.title}</h4></TableCell>
              <TableCell align="right"><h4>{row.date}</h4></TableCell>
              <TableCell align="right"><h4>{row.autor}</h4></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}