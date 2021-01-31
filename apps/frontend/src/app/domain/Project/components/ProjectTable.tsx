import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Project } from '@mj-website/api-interfaces';
import { Card, CardBody, CardHeader, CardHeading, IconButton } from '@mj-website/ui-components';
import React from 'react';
import { Edit2, PlusCircle, RefreshCw, Trash } from 'react-feather';

export type ProjectListProps = {
  collection: Project[];
  onRefresh: () => void;
  selected?: Project;
  onSelect: (project?: Project) => void;
  onEdit: () => void;
  onDelete: () => void;
};

const ProjectList: React.FC<ProjectListProps> = ({
  collection,
  selected,
  onRefresh,
  onSelect,
  onEdit,
  onDelete,
}: ProjectListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardHeading>{selected ? `Selected ${selected.name}` : 'Projects'}</CardHeading>
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
          <Table stickyHeader aria-label="Projects table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={!!selected && collection.length > 1}
                    checked={!!selected && collection.length === 1}
                    onChange={() => onSelect()}
                    inputProps={{ 'aria-label': 'Deselect all projects' }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Photos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collection.map((row: Project, index) => {
                return (
                  <TableRow key={row.name} onClick={() => onSelect(row)}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={!!selected && selected.id === row.id}
                        inputProps={{ 'aria-labelledby': `project-table-checkbox-${index}` }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.category?.name}</TableCell>
                    <TableCell>{row.client?.name}</TableCell>
                    <TableCell>{`${row.photos.length} photos`}</TableCell>
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

export default ProjectList;
