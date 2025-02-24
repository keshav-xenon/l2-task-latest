package models

type Library struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"unique;not null"`
}

type User struct {
	ID            uint   `gorm:"primaryKey"`
	Name          string `gorm:"not null"`
	Email         string `gorm:"unique;not null"`
	ContactNumber string
	Role          string `gorm:"not null"`
	LibID         uint
}
type BookInventory struct {
	ISBN            string `gorm:"primaryKey"`
	LibID           uint
	Title           string `gorm:"not null"`
	Authors         string `gorm:"not null"`
	Publisher       string
	Version         string
	TotalCopies     int `gorm:"default:0"`
	AvailableCopies int `gorm:"default:0"`
}

type RequestEvent struct {
	ReqID        uint `gorm:"primaryKey"`
	BookID       string
	ReaderID     uint
	RequestDate  string
	ApprovalDate string
	ApproverID   uint
	RequestType  string
}

type IssueRegistry struct {
	IssueID            uint `gorm:"primaryKey"`
	ISBN               string
	ReaderID           uint
	IssueApproverID    uint
	IssueStatus        string
	IssueDate          string
	ExpectedReturnDate string
	ReturnDate         string
	ReturnApproverID   uint
}
