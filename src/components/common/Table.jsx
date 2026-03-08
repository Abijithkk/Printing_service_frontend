import PropTypes from 'prop-types';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

const SortableRow = ({
  row,
  columns,
  onEdit,
  onDelete,
  renderCustomActions,
  id,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: 'relative',
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`transition-colors ${isDragging ? 'bg-blue-50 shadow-inner' : 'hover:bg-gray-50'}`}
    >
      {columns.map((col, colIndex) => (
        <td
          key={colIndex}
          className="whitespace-nowrap px-6 py-4 text-gray-700"
        >
          {col.accessor === 'dragHandle' ? (
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab p-1 text-gray-400 hover:text-gray-600 active:cursor-grabbing"
            >
              <ArrowsUpDownIcon className="h-5 w-5" />
            </div>
          ) : col.render ? (
            col.render(row)
          ) : (
            row[col.accessor]
          )}
        </td>
      ))}
      {(onEdit || onDelete || renderCustomActions) && (
        <td className="space-x-3 whitespace-nowrap px-6 py-4 text-right font-medium">
          {renderCustomActions && renderCustomActions(row)}
          {onEdit && (
            <button
              onClick={() => onEdit(row)}
              className="text-blue-600 transition-colors hover:text-blue-900"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(row)}
              className="text-red-600 transition-colors hover:text-red-900"
            >
              Delete
            </button>
          )}
        </td>
      )}
    </tr>
  );
};

const Table = ({
  columns,
  data,
  onEdit,
  onDelete,
  renderCustomActions,
  onReorder,
  rowIdKey = 'id',
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.findIndex((item) => item[rowIdKey] === active.id);
      const newIndex = data.findIndex((item) => item[rowIdKey] === over.id);
      onReorder(arrayMove(data, oldIndex, newIndex));
    }
  };

  const TableLayout = (
    <div className="overflow-hidden border border-gray-200 bg-white shadow sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-4 text-left">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete || renderCustomActions) && (
                <th scope="col" className="px-6 py-4 text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white text-sm">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (onEdit || onDelete || renderCustomActions ? 1 : 0)
                  }
                  className="px-6 py-8 text-center text-gray-400"
                >
                  No records found.
                </td>
              </tr>
            ) : onReorder ? (
              <SortableContext
                items={data.map((item) => item[rowIdKey])}
                strategy={verticalListSortingStrategy}
              >
                {data.map((row, rowIndex) => (
                  <SortableRow
                    key={row[rowIdKey]}
                    id={row[rowIdKey]}
                    row={row}
                    rowIndex={rowIndex}
                    columns={columns}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    renderCustomActions={renderCustomActions}
                  />
                ))}
              </SortableContext>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition-colors hover:bg-gray-50"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="whitespace-nowrap px-6 py-4 text-gray-700"
                    >
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  {(onEdit || onDelete || renderCustomActions) && (
                    <td className="space-x-3 whitespace-nowrap px-6 py-4 text-right font-medium">
                      {renderCustomActions && renderCustomActions(row)}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-blue-600 transition-colors hover:text-blue-900"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-red-600 transition-colors hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (onReorder) {
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {TableLayout}
      </DndContext>
    );
  }

  return TableLayout;
};

SortableRow.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number,
  columns: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  renderCustomActions: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  renderCustomActions: PropTypes.func,
  onReorder: PropTypes.func,
  rowIdKey: PropTypes.string,
};

export default Table;
