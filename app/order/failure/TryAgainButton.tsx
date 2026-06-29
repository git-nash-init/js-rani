"use client";

export default function TryAgainButton() {
  return (
    <button
      id="try-again-btn"
      onClick={() => history.back()}
      className="btn btn-gold w-full"
    >
      🔄 Try Payment Again
    </button>
  );
}
