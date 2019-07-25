import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { searchSong } from '../../services/songApi'
import Downshift from 'downshift'
import throttle from 'lodash/throttle'

const search = throttle(searchSong, 100, {
  trailing: true,
})

const renderInput = (inputProps) => {
  return (
    <input
      {...inputProps}
    />
  )
}

const getSuggestions = (value, { showEmpty = false } = {}) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0 && !showEmpty
    ? []
    : [].filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue

      if (keep) {
        count += 1
      }

      return keep
    })
}

const renderSuggestion = (suggestionProps) => {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

  return (
    <div
      {...itemProps}
      key={suggestion.label}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </div>
  )
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
}

const Index = ({ onSubmit }) => {
  const [value, setValue] = useState(null)
  const [songId, setSongId] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState()

  const onChange = (e) => {
    const query = e.target.value
    if (!query) {
      setSearchResults([])
    } else {
      search(query)
        .then(setSearchResults)
        .catch((e) => setError(e.message))
    }
  }

  return (
    <Downshift>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem,
      }) => {
        const { onBlur, onFocus, ...inputProps } = getInputProps({
          placeholder: 'Search for a country (start with a)',
          onChange,
        })

        return (
          <div style={{
            width: '100%',
          }}>
            {renderInput({
              fullWidth: true,
              label: 'Country',
              InputLabelProps: getLabelProps({ shrink: true }),
              InputProps: { onBlur, onFocus },
              inputProps,
            })}

            <div {...getMenuProps()}>
              {isOpen ? (
                <div>
                  {getSuggestions(inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )
      }}
    </Downshift>
  )
}

export default Index
