import React from "react";

function paymentUser() {
  return (
    <div className="container">
      <div className="card p-4 mb-4 w-50 rounded-4">
        <div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
            <label className="form-check-label" htmlFor="radioDefault1"></label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2" defaultChecked />
            <label className="form-check-label" htmlFor="radioDefault2"></label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default paymentUser;
