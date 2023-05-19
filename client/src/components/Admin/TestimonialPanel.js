import React, { useState } from "react";
import Testimonial from "./Testimonial";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ADMIN_TESTIMONIALS } from "../../utils/queries";
import { ADMIN_APPROVE_TESTIMONIAL } from "../../utils/mutations";

export default function TestimonialPanel() {
  const [filterDisapproved, setFilterDisapproved] = useState(true);
  const { data, loading } = useQuery(QUERY_ADMIN_TESTIMONIALS);
  const [approveTestimonial] = useMutation(ADMIN_APPROVE_TESTIMONIAL);
  if (loading) return <div>Loading...</div>;
  const testimonials = data.adminTestimonials;

  return (
    <div className="bg-blue-200 rounded p-4">
      <h2 className="text-lg">Testimonials</h2>
      <form>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={filterDisapproved}
            onChange={() => setFilterDisapproved(!filterDisapproved)}
          />
          <span className="ml-2">Show only awaiting approval</span>
        </label>
      </form>
      {testimonials
        .filter((testimonial) =>
          filterDisapproved ? !testimonial.isApproved : true
        )
        .map((testimonial) => {
          return (
            <Testimonial
              key={testimonial._id}
              testimonial={testimonial}
              approveTestimonial={approveTestimonial}
            />
          );
        })}
    </div>
  );
}
