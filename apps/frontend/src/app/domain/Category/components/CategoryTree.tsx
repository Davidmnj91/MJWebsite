import { Checkbox, FormControlLabel } from '@material-ui/core';
import { TreeItem, TreeView } from '@material-ui/lab';
import { Category } from '@mj-website/api-interfaces';
import { Card, CardBody, CardHeader, CardHeading, IconButton } from '@mj-website/ui-components';
import React, { MutableRefObject } from 'react';
import { ChevronRight, ChevronUp, Edit2, PlusCircle, RefreshCw, Trash } from 'react-feather';

export type CategoryListProps = {
  collection: Category[];
  onRefresh: () => void;
  selected?: Category;
  onSelect: (category?: Category) => void;
  onEdit: () => void;
  onDelete: () => void;
};

const CategoryList: React.FC<CategoryListProps> = ({
  collection,
  selected,
  onRefresh,
  onSelect,
  onEdit,
  onDelete,
}: CategoryListProps) => {
  const buildTree = (entities: Category[]): Category[] => {
    const hashTable: { [key: string]: any } = {};
    entities.forEach((e) => (hashTable[e.id] = { ...e, childNodes: [] }));
    const dataTree: Category[] = [];
    entities.forEach((e) => {
      if (e.parent_id) hashTable[e.parent_id.id].childNodes.push(hashTable[e.id]);
      else dataTree.push(hashTable[e.id]);
    });
    return dataTree;
  };

  const categoryTree: MutableRefObject<Category[]> = React.useRef(buildTree(collection));

  const renderTree = (node: Category) => (
    <TreeItem
      key={node.id}
      nodeId={`${node.id}`}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checked={!!selected && selected.id === node.id}
              onChange={() => onSelect(node)}
              onClick={(e) => e.stopPropagation()}
            />
          }
          label={node.name}
          key={node.id}
        />
      }
    >
      {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <Card>
      <CardHeader>
        <CardHeading>{selected ? `Selected ${selected.name}` : 'Categories'}</CardHeading>
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
        <TreeView
          style={{
            maxHeight: 500,
            overflowY: 'auto',
            flexGrow: 1,
          }}
          defaultCollapseIcon={<ChevronUp />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRight />}
        >
          {categoryTree.current.map((entity) => renderTree(entity))}
        </TreeView>
      </CardBody>
    </Card>
  );
};

export default CategoryList;
