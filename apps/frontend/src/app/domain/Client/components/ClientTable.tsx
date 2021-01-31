import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Client } from '@mj-website/api-interfaces';
import { Card, CardBody, CardHeader, CardHeading, IconButton } from '@mj-website/ui-components';
import React from 'react';
import { Edit2, PlusCircle, RefreshCw, Trash } from 'react-feather';

export type ClientListProps = {
  collection: Client[];
  onRefresh: () => void;
  selected?: Client;
  onSelect: (client?: Client) => void;
  onEdit: () => void;
  onDelete: () => void;
};

const ClientList: React.FC<ClientListProps> = ({
  collection,
  selected,
  onRefresh,
  onSelect,
  onEdit,
  onDelete,
}: ClientListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardHeading>{selected ? `Selected ${selected.name}` : 'Clients'}</CardHeading>
        <div style={{ display: 'flex', gridGap: '0 5px' }}>
          <IconButton title="Edit" aria-label="Edit" color="primary" onClick={onRefresh}>
            <RefreshCw />
          </IconButton>
          {selected ? (
            <>
              <IconButton primary title="Edit" aria-label="Edit" color="primary" onClick={onEdit}>
                <Edit2 />
              </IconButton>
              <IconButton warning title="Delete" aria-label="Delete" color="primary" onClick={onDelete}>
                <Trash />
              </IconButton>
            </>
          ) : (
            <IconButton primary title="Create" aria-label="Create" color="secondary" onClick={onEdit}>
              <PlusCircle />
            </IconButton>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="Clients table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={!!selected && collection.length > 1}
                    checked={!!selected && collection.length === 1}
                    onChange={() => onSelect()}
                    inputProps={{ 'aria-label': 'Deselect all clients' }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collection.map((row: Client, index) => {
                return (
                  <TableRow key={row.name} onClick={() => onSelect(row)}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={!!selected && selected.id === row.id}
                        inputProps={{ 'aria-labelledby': `client-table-checkbox-${index}` }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default ClientList;
