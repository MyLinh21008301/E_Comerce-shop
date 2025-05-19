export default function OrderItem({ item, onUpdateQuantity, onRemove }) {
    return (
      <div className="flex items-center justify-between border-b py-4">
        <div className="flex items-center gap-4">
          <img
            src={item.image || '/sample.jpg'}
            alt={item.name}
            className="w-16 h-16 border rounded"
          />
          <span>{item.name}</span>
        </div>
        <div className="text-right">
          <p className="line-through text-gray-400 text-sm">{item.oldPrice?.toLocaleString()}đ</p>
          <p className="text-red-600 font-semibold">{item.price.toLocaleString()}đ</p>
          <div className="flex items-center justify-end mt-1">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="px-2"
            >
              -
            </button>
            <input
              type="text"
              value={item.quantity}
              readOnly
              className="w-8 text-center border rounded"
            />
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="px-2"
            >
              +
            </button>
          </div>
        </div>
        <p className="text-red-600 font-semibold w-28 text-right">
          {(item.price * item.quantity).toLocaleString()}đ
        </p>
        <button onClick={onRemove} className="text-gray-500">
          🗑️
        </button>
      </div>
    );
  }