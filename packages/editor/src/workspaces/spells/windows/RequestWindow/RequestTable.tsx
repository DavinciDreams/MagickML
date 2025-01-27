import { useEffect, useMemo, useState } from 'react'
import {
  useAsyncDebounce,
  useGlobalFilter,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
  Row,
} from 'react-table'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Pagination,
  Stack,
  IconButton,
  Grid,
} from '@mui/material'
import { VscArrowDown, VscArrowUp, VscTrash } from 'react-icons/vsc'
import { FaFileCsv } from 'react-icons/fa'
import { useSnackbar } from 'notistack'
import _ from 'lodash'
import { CSVLink } from 'react-csv'
import { useConfig } from '../../../../contexts/ConfigProvider'
import { Button } from '@magickml/client-core'
import { API_ROOT_URL } from '@magickml/engine'

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 500)
  return (
    <input
      type="text"
      value={value || ''}
      onChange={e => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder="Search requests..."
      style={{ width: '40em', border:0, margin: 0 }}
    />
  )
}

const DefaultColumnFilter = ({
  column: { filterValue, setFilter, Header },
}) => {
  return (
    <input
      type="text"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={Header}
      style={{
        width: '100%',
        border: 0,
        margin: 0,
        borderRadius: 0,
      }}
    />
  )
}

function EventTable({ requests, updateCallback }) {
  const { enqueueSnackbar } = useSnackbar()
  const config = useConfig()

  const columns = useMemo(
    () => [
      {
        Header: 'Provider',
        accessor: 'provider',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Node ID',
        accessor: 'nodeId',
      },
      {
        Header: 'Cost',
        accessor: 'cost',
        Cell: (obj) => '$' + obj.value.toFixed(7),
      },
      {
        Header: 'Req Time',
        accessor: 'duration',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Code',
        accessor: 'statusCode',
      },
      {
        Header: 'Model',
        accessor: 'model',
      },
      {
        Header: 'Req Data',
        accessor: 'requestData',
      },
      {
        Header: 'Res Data',
        accessor: 'responseData',
      },
      {
        Header: 'Parameters',
        accessor: 'parameters',
      },
      {
        Header: 'Spell',
        accessor: 'spell',
      },
      {
        Header: ' ',
        Cell: row => (
          <IconButton onClick={() => handleRequestDelete(row.row.original)}>
            <VscTrash size={16} color="#ffffff" />
          </IconButton>
        ),
      },
    ],
    []
  )

  const updateEvent = async ({ id, ...rowData }, columnId, value) => {
    const reqBody = {
      ...rowData,
      [columnId]: value,
      projectId: config.projectId,
    }
    if (!_.isEqual(reqBody, rowData)) {
      const resp = await fetch(
        `${API_ROOT_URL}/request/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqBody),
        }
      )

      const json = await resp.json()

      if (json) enqueueSnackbar('Event updated', { variant: 'success' })
      else enqueueSnackbar('Error updating event', { variant: 'error' })
      updateCallback()
    }
  }

  const EditableCell = ({
    value = '',
    row: { original: row },
    column: { id },
    updateEvent,
  }) => {
    const [val, setVal] = useState(value)
    const onChange = e => typeof val !== 'object' && setVal(e.target.value)
    const onBlur = e => updateEvent(row, id, val)
    useEffect(() => setVal(value), [value])
    return (
      <input
        value={val && typeof val === 'object' ? JSON.stringify(val.data) : val}
        onChange={onChange}
        onBlur={onBlur}
        className="bare-input"
      />
    )
  }

  const defaultColumn = {
    Cell: EditableCell,
    Filter: DefaultColumnFilter,
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    flatRows,
    prepareRow,
    pageOptions,
    gotoPage,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data: requests,
      defaultColumn,
      updateEvent,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as any

  const handlePageChange = (page: number) => {
    const pageIndex = page - 1
    gotoPage(pageIndex)
  }

  const handleRequestDelete = async (event: any) => {
    // instead of deleting, call the updateEvent function with param hidden = true
    const resp = await fetch(
      `${API_ROOT_URL}/request/${event.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hidden: true }),
      }
    )

    const json = await resp.json()

    if (json) enqueueSnackbar('Event deleted', { variant: 'success' })
    else enqueueSnackbar('Error deleting Event', { variant: 'error' })
    updateCallback()
  }

  const originalRows = useMemo(
    () => flatRows.map(row => row.original),
    [flatRows]
  )

  return (
    <Stack spacing={2}>
      <Grid container justifyContent="left" style={{ padding: '1em' }}>
        <GlobalFilter
          globalFilter={(state as any).globalFilter} // typing is wrong for this?
          setGlobalFilter={setGlobalFilter}
        />
        <Button
          style={{
            display: 'inline',
            backgroundColor: 'purple',
            border: 'none',
            color: 'white',
            marginRight: '.5em',
            marginLeft: 'auto',
          }}
          name="refresh"
          onClick={updateCallback}
        >
          Refresh
        </Button>
        <CSVLink
          data={originalRows}
          filename="requests.csv"
          target="_blank"
          style={{
            textDecoration: 'none',
            display: 'inline',
            marginLeft: '.5em',
            marginRight: '.5em',
          }}
        >
          <Button
            style={{
              textDecoration: 'none',
              display: 'inline',
              backgroundColor: 'purple',
              color: 'white',
              border: 'none',
            }}
          >
            <FaFileCsv size={14} />
          </Button>
        </CSVLink>
      </Grid>
      <TableContainer component={Paper} style={{ width: '100%', padding: 0, margin: 0 }}>
        <Table style={{ width: '100%', padding: 0, margin: 0 }} {...getTableProps()}>
          <TableHead style={{ backgroundImage: 'none', padding: 0, margin: 0 }}>
            {headerGroups.map((headerGroup, idx) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={idx} style={{ backgroundImage: 'none', padding: 0, margin: 0 }}>
                {headerGroup.headers.map((column, idx) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ fontSize: '0.985rem', padding: '0em', margin: '0em', border: 0 }}
                    key={idx}
                  >
                    <Stack spacing={1}>
                      <div style={{position: 'relative'}}>
                        {column.canFilter ? column.render('Filter') : null}
                        <span style={{position: 'absolute', top: '.75em', right: '.75em', zIndex: '10'}}>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <VscArrowDown size={14} />
                            ) : (
                              <VscArrowUp size={14} />
                            )
                          ) : (
                            ''
                          )}
                        </span>
                        </div>
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row: Row<object>, idx: number) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()} key={idx}>
                  {row.cells.map((cell, idx) => (
                    <TableCell {...cell.getCellProps} key={idx}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={pageOptions.length}
        onChange={(e, page) => handlePageChange(page)}
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  )
}

export default EventTable
