import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MY_TESTIMONIALS } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { UPDATE_TESTIMONIAL } from '../utils/mutations';
import { REMOVE_TESTIMONIAL } from '../utils/mutations';

const Me = () => {
  const { loading, data, error } = useQuery(QUERY_MY_TESTIMONIALS, {
    fetchPolicy: 'network-only',
  });

  const [updateTestimonial] = useMutation(UPDATE_TESTIMONIAL);
  const [removeTestimonial] = useMutation(REMOVE_TESTIMONIAL);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setEditingText(testimonial.testimonialText);
  };

  const handleDelete = async (testimonialId) => {
    try {
      await removeTestimonial({
        variables: {
          testimonialId,
        },
        refetchQueries: [{ query: QUERY_MY_TESTIMONIALS }],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    await updateTestimonial({
      variables: {
        testimonialId: editingId,
        testimonialText: editingText,
      },
    });
    setEditingId(null);
    setEditingText('');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error! {error.message}</p>;
  }

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-semibold mb-4'>My Testimonials</h1>
      {data.myTestimonials.map((testimonial, index) => (
        <div key={index} className='bg-white shadow rounded-lg p-6 mb-4'>
          {editingId === testimonial._id ? (
            <form onSubmit={handleSubmitEdit}>
              <input value={editingText} onChange={(e) => setEditingText(e.target.value)} />
              <button type='submit'>Submit</button>
            </form>
          ) : (
            <>
              <p className='text-lg mb-2'>"{testimonial.testimonialText}"</p>
              <button onClick={() => handleEdit(testimonial)}>Edit</button>
              <button onClick={() => handleDelete(testimonial._id)}>Delete</button>
            </>
          )}
          <p className='text-gray-500'>Posted on {new Date(parseInt(testimonial.createdAt)).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Me;
