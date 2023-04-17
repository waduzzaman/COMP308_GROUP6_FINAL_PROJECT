import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Table } from 'antd';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const GET_ALERT = gql`
  {
    emergencyAlerts{
      _id,
      alertMessage,
    }
  }
  `;

const ListAlert = () => {

  useEffect(() => {
    refetch();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_ALERT);


  const columns = [
    {
      dataIndex: "alertMessage",
      key: "alertMessage"
    }
  ]


  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;


  return (
    <div>
      <br /><br /><br /><center><h2>Emergency Alert <FontAwesomeIcon icon={faExclamationTriangle} color='red' /></h2></center><br />
      <div className='nursePage'>

        <h1> <Table className='tip' columns={columns} dataSource={data.emergencyAlerts} pagination={false} /></h1>
      </div></div>
  );
}

export default ListAlert;