import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Table } from 'antd';

const GET_VITAL_SIGNS = gql`
  {
    vitalSigns{
      _id,
      bodyTemperature,
      heartRate,
      bloodPressure,
      respiratoryRate,
      weight,
      patient,
    }
  }
  `;

const ShowVitalSigns = () => {
  useEffect(() => {
    refetch();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_VITAL_SIGNS);

  const columns = [
    {
      title: 'Body Temperature',
      dataIndex: "bodyTemperature",
      key: "bodyTemperature"
    },
    {
      title: 'Heart Rate',
      dataIndex: "heartRate",
      key: "heartRate"
    },
    {
      title: 'Blood Pressure',
      dataIndex: "bloodPressure",
      key: "bloodPressure"
    },
    {
      title: 'Respiratory Rate',
      dataIndex: "respiratoryRate",
      key: "respiratoryRate"
    },
    {
      title: 'Weight',
      dataIndex: "weight",
      key: "weight"
    }
  ]
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;


  return (
    <div>
      <br /><br />
      <center><h4>{data.vitalSigns.patient} Patient Vital Signs Information List</h4></center><br /><br />
      <Table className='tip' columns={columns} dataSource={data.vitalSigns} pagination={false} />

    </div>


  );

}

export default ShowVitalSigns;