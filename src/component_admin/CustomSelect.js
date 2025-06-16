import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap"; // ✅ Import đúng

function CustomSelect({ options, onSelect, placeholder = "Nhập để tìm kiếm", value }) {
  const [searchTerm, setSearchTerm] = useState(""); //Lưu nội dung nhập vào ô tìm kiếm.
  const [filteredOptions, setFilteredOptions] = useState(options); //Lưu danh sách kết quả phù hợp.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    console.log("Options trong CustomSelect:", value);
    setSearchTerm(value ? value.label : "");
  }, [value]);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    //Nếu searchTerm rỗng thì ẩn DropdownMenu
    if (value.trim() === "") {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
    // Lọc danh sách dựa trên từ khóa tìm kiếm
    setFilteredOptions(options.filter((option) => option.label.toLowerCase().includes(value)));
  };

  const handleOptionSelect = (option) => {
    onSelect(option);
    setSearchTerm(option.label);
    setIsDropdownOpen(false);
  };

  return (
    <Dropdown show={isDropdownOpen} onToggle={(isOpen) => setIsDropdownOpen(isOpen)} className="w-75">
      <FormControl
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        placeholder={placeholder}
        className="border-0 rounded-0"
      />

      <Dropdown.Menu style={{ width: "100%" }}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <Dropdown.Item key={option.value} onClick={() => handleOptionSelect(option)}>
              {option.label}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>Không có kết quả</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomSelect;
