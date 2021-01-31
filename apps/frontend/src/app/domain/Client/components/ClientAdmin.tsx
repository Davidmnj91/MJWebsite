import { Client } from '@mj-website/api-interfaces';
import { Spinner } from '@mj-website/ui-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../..';
import { ClientActions, ClientSelectors } from '../Slice';
import ClientFormComponent from './ClientForm';
import ClientList from './ClientTable';

const ClientAdmin = () => {
  const { entities, loading, selected, editing } = useSelector((state: RootState) => ({
    entities: ClientSelectors.selectAll(state.clients),
    loading: state.clients.loading,
    selected: state.clients.selected,
    editing: state.clients.editing,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ClientActions.request());
  }, [dispatch]);

  const selectedClient = selected ? entities.find((c) => c.id === selected) : undefined;

  const doSubmit = (client: Client) => {
    dispatch(selected ? ClientActions.update(client) : ClientActions.create(client));
  };

  if (loading) {
    return <Spinner />;
  }

  if (editing) {
    return (
      <ClientFormComponent
        initialClient={selectedClient}
        handleSubmit={doSubmit}
        handleCancel={() => dispatch(ClientActions.cancelEdit())}
      />
    );
  }

  return (
    <ClientList
      collection={entities}
      onRefresh={() => dispatch(ClientActions.request())}
      selected={selectedClient}
      onSelect={(c) => dispatch(ClientActions.select({ id: c?.id }))}
      onEdit={() => dispatch(ClientActions.edit())}
      onDelete={() => dispatch(ClientActions.delete(selected))}
    />
  );
};

export default ClientAdmin;
